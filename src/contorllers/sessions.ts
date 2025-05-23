import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { isEqual } from "../utils/isEqual";
import { sendResponse } from "../utils/responseUtils";
import { Request, Response } from "express";
import STATUS_CODES from "../utils/statusCodes";

export const upsertSessionsData = async (sessionsData: any[]): Promise<number> => {
    try {

        const sessionDataFromDb = await prisma.sessions.findMany();
        const sessionDataFromDbMap = new Map(sessionDataFromDb.map(s => [s.ID, s]));

        const sessionsToUpsert = sessionsData.filter(session => {
            const sessionFromDb = sessionDataFromDbMap.get(session.ID);
            if (!sessionFromDb) return true;

            const fieldsToCompare = [
                "CinemaId", "ScheduledFilmId", "SessionId", "AreaCategoryCodes",
                "MinimumTicketPriceInCents", "Showtime", "IsAllocatedSeating",
                "AllowChildAdmits", "SeatsAvailable", "AllowComplimentaryTickets",
                "EventId", "GlobalEventId", "PriceGroupCode", "ScreenName", "ScreenNameAlt",
                "ScreenNumber", "CinemaOperatorCode", "FormatCode", "FormatHOPK", "SalesChannels",
                "SessionAttributesNames", "ConceptAttributesNames", "AllowTicketSales",
                "HasDynamicallyPricedTicketsAvailable", "PlayThroughId", "SessionBusinessDate",
                "SessionDisplayPriority", "GroupSessionsByAttribute", "SoldoutStatus",
                "TypeCode", "InSeatDeliveryFee"
            ] as const;

            for (const field of fieldsToCompare) {
                if (!isEqual(session[field], sessionFromDb[field])) {
                    console.log(`Field changed: ${field}`, {
                        from: sessionFromDb[field],
                        to: session[field]
                    });
                    return true;
                }
            }


            return false;
        });

        for (const session of sessionsToUpsert) {
            if (!session.ID) continue;

            const scheduledFilmExists = await prisma.movies.findUnique({
                where: { ID: session.ScheduledFilmId },
                select: { ID: true }
            });

            if (!scheduledFilmExists) {
                console.warn(`Skipping session ${session.ID} because ScheduledFilmId ${session.ScheduledFilmId} not found.`);
                continue;
            }

            await prisma.sessions.upsert({
                where: { ID: session.ID },
                update: {
                    CinemaId: session.CinemaId,
                    ScheduledFilmId: session.ScheduledFilmId,
                    SessionId: session.SessionId,
                    AreaCategoryCodes: session.AreaCategoryCodes,
                    MinimumTicketPriceInCents: session.MinimumTicketPriceInCents,
                    Showtime: new Date(session.Showtime),
                    IsAllocatedSeating: session.IsAllocatedSeating,
                    AllowChildAdmits: session.AllowChildAdmits,
                    SeatsAvailable: session.SeatsAvailable,
                    AllowComplimentaryTickets: session.AllowComplimentaryTickets,
                    EventId: session.EventId,
                    GlobalEventId: session.GlobalEventId,
                    PriceGroupCode: session.PriceGroupCode,
                    ScreenName: session.ScreenName,
                    ScreenNameAlt: session.ScreenNameAlt || null,
                    ScreenNumber: session.ScreenNumber,
                    CinemaOperatorCode: session.CinemaOperatorCode,
                    FormatCode: session.FormatCode,
                    FormatHOPK: session.FormatHOPK,
                    SalesChannels: session.SalesChannels,
                    SessionAttributesNames: session.SessionAttributesNames,
                    ConceptAttributesNames: session.ConceptAttributesNames,
                    AllowTicketSales: session.AllowTicketSales,
                    HasDynamicallyPricedTicketsAvailable: session.HasDynamicallyPricedTicketsAvailable,
                    PlayThroughId: session.PlayThroughId,
                    SessionBusinessDate: new Date(session.SessionBusinessDate),
                    SessionDisplayPriority: session.SessionDisplayPriority,
                    GroupSessionsByAttribute: session.GroupSessionsByAttribute,
                    SoldoutStatus: session.SoldoutStatus,
                    TypeCode: session.TypeCode,
                    InSeatDeliveryFee: session.InSeatDeliveryFee,
                },
                create: {
                    ID: session.ID,
                    CinemaId: session.CinemaId,
                    ScheduledFilmId: session.ScheduledFilmId,
                    SessionId: session.SessionId,
                    AreaCategoryCodes: session.AreaCategoryCodes,
                    MinimumTicketPriceInCents: session.MinimumTicketPriceInCents,
                    Showtime: new Date(session.Showtime),
                    IsAllocatedSeating: session.IsAllocatedSeating,
                    AllowChildAdmits: session.AllowChildAdmits,
                    SeatsAvailable: session.SeatsAvailable,
                    AllowComplimentaryTickets: session.AllowComplimentaryTickets,
                    EventId: session.EventId,
                    GlobalEventId: session.GlobalEventId,
                    PriceGroupCode: session.PriceGroupCode,
                    ScreenName: session.ScreenName,
                    ScreenNameAlt: session.ScreenNameAlt || null,
                    ScreenNumber: session.ScreenNumber,
                    CinemaOperatorCode: session.CinemaOperatorCode,
                    FormatCode: session.FormatCode,
                    FormatHOPK: session.FormatHOPK,
                    SalesChannels: session.SalesChannels,
                    SessionAttributesNames: session.SessionAttributesNames,
                    ConceptAttributesNames: session.ConceptAttributesNames,
                    AllowTicketSales: session.AllowTicketSales,
                    HasDynamicallyPricedTicketsAvailable: session.HasDynamicallyPricedTicketsAvailable,
                    PlayThroughId: session.PlayThroughId,
                    SessionBusinessDate: new Date(session.SessionBusinessDate),
                    SessionDisplayPriority: session.SessionDisplayPriority,
                    GroupSessionsByAttribute: session.GroupSessionsByAttribute,
                    SoldoutStatus: session.SoldoutStatus,
                    TypeCode: session.TypeCode,
                    InSeatDeliveryFee: session.InSeatDeliveryFee,
                }
            });
        }

        console.log("Session data upserted successfully.");
        return sessionsToUpsert.length;
    } catch (error: any) {
        console.error("Error upserting session data:", error);
        return 0;
    }
}

export const syncSessionTables = async () => {
    try {
        const sessionsData = await prisma.sessions.findMany();
        const sessionsBackupData = await prisma.sessions_backup.findMany();
        const backupMap = new Map(sessionsBackupData.map(s => [s.ID, s]));

        const sessionsToUpsert = sessionsData.filter(session => {
            const backup = backupMap.get(session.ID);
            if (!backup) return true;

            const fieldsToCompare = [
                "CinemaId", "ScheduledFilmId", "SessionId", "AreaCategoryCodes",
                "MinimumTicketPriceInCents", "Showtime", "IsAllocatedSeating",
                "AllowChildAdmits", "SeatsAvailable", "AllowComplimentaryTickets",
                "EventId", "GlobalEventId", "PriceGroupCode", "ScreenName", "ScreenNameAlt",
                "ScreenNumber", "CinemaOperatorCode", "FormatCode", "FormatHOPK", "SalesChannels",
                "SessionAttributesNames", "ConceptAttributesNames", "AllowTicketSales",
                "HasDynamicallyPricedTicketsAvailable", "PlayThroughId", "SessionBusinessDate",
                "SessionDisplayPriority", "GroupSessionsByAttribute", "SoldoutStatus",
                "TypeCode", "InSeatDeliveryFee"
            ] as const;

            for (const field of fieldsToCompare) {
                if (!isEqual(session[field], backup[field])) {
                    console.log(`Field changed: ${field}`, {
                        from: backup[field],
                        to: session[field]
                    });
                    return true;
                }
            }

            return false;
        });

        for (const session of sessionsToUpsert) {
            if (!session.ID) continue;

            const scheduledFilmExists = await prisma.movies_backup.findUnique({
                where: { ID: session.ScheduledFilmId },
                select: { ID: true }
            });

            if (!scheduledFilmExists) {
                console.warn(`Skipping session ${session.ID} because ScheduledFilmId ${session.ScheduledFilmId} not found.`);
                continue;
            }

            await prisma.sessions_backup.upsert({
                where: { ID: session.ID },
                update: {
                    CinemaId: session.CinemaId,
                    ScheduledFilmId: session.ScheduledFilmId,
                    SessionId: session.SessionId,
                    AreaCategoryCodes: session.AreaCategoryCodes === null ? Prisma.JsonNull : session.AreaCategoryCodes,
                    MinimumTicketPriceInCents: session.MinimumTicketPriceInCents,
                    Showtime: new Date(session.Showtime),
                    IsAllocatedSeating: session.IsAllocatedSeating,
                    AllowChildAdmits: session.AllowChildAdmits,
                    SeatsAvailable: session.SeatsAvailable,
                    AllowComplimentaryTickets: session.AllowComplimentaryTickets,
                    EventId: session.EventId,
                    GlobalEventId: session.GlobalEventId,
                    PriceGroupCode: session.PriceGroupCode,
                    ScreenName: session.ScreenName,
                    ScreenNameAlt: session.ScreenNameAlt,
                    ScreenNumber: session.ScreenNumber,
                    CinemaOperatorCode: session.CinemaOperatorCode,
                    FormatCode: session.FormatCode,
                    FormatHOPK: session.FormatHOPK,
                    SalesChannels: session.SalesChannels,
                    SessionAttributesNames: session.SessionAttributesNames === null ? Prisma.JsonNull : session.SessionAttributesNames,
                    ConceptAttributesNames: session.ConceptAttributesNames === null ? Prisma.JsonNull : session.ConceptAttributesNames,
                    AllowTicketSales: session.AllowTicketSales,
                    HasDynamicallyPricedTicketsAvailable: session.HasDynamicallyPricedTicketsAvailable,
                    PlayThroughId: session.PlayThroughId,
                    SessionBusinessDate: new Date(session.SessionBusinessDate),
                    SessionDisplayPriority: session.SessionDisplayPriority,
                    GroupSessionsByAttribute: session.GroupSessionsByAttribute,
                    SoldoutStatus: session.SoldoutStatus,
                    TypeCode: session.TypeCode,
                    InSeatDeliveryFee: session.InSeatDeliveryFee,
                },
                create: {
                    ID: session.ID,
                    CinemaId: session.CinemaId,
                    ScheduledFilmId: session.ScheduledFilmId,
                    SessionId: session.SessionId,
                    AreaCategoryCodes: session.AreaCategoryCodes === null ? Prisma.JsonNull : session.AreaCategoryCodes,
                    MinimumTicketPriceInCents: session.MinimumTicketPriceInCents,
                    Showtime: new Date(session.Showtime),
                    IsAllocatedSeating: session.IsAllocatedSeating,
                    AllowChildAdmits: session.AllowChildAdmits,
                    SeatsAvailable: session.SeatsAvailable,
                    AllowComplimentaryTickets: session.AllowComplimentaryTickets,
                    EventId: session.EventId,
                    GlobalEventId: session.GlobalEventId,
                    PriceGroupCode: session.PriceGroupCode,
                    ScreenName: session.ScreenName,
                    ScreenNameAlt: session.ScreenNameAlt,
                    ScreenNumber: session.ScreenNumber,
                    CinemaOperatorCode: session.CinemaOperatorCode,
                    FormatCode: session.FormatCode,
                    FormatHOPK: session.FormatHOPK,
                    SalesChannels: session.SalesChannels,
                    SessionAttributesNames: session.SessionAttributesNames === null ? Prisma.JsonNull : session.SessionAttributesNames,
                    ConceptAttributesNames: session.ConceptAttributesNames === null ? Prisma.JsonNull : session.ConceptAttributesNames,
                    AllowTicketSales: session.AllowTicketSales,
                    HasDynamicallyPricedTicketsAvailable: session.HasDynamicallyPricedTicketsAvailable,
                    PlayThroughId: session.PlayThroughId,
                    SessionBusinessDate: new Date(session.SessionBusinessDate),
                    SessionDisplayPriority: session.SessionDisplayPriority,
                    GroupSessionsByAttribute: session.GroupSessionsByAttribute,
                    SoldoutStatus: session.SoldoutStatus,
                    TypeCode: session.TypeCode,
                    InSeatDeliveryFee: session.InSeatDeliveryFee,
                }
            });
        }

        console.log("Session Table synced successfully!");

    } catch (error: any) {
        console.error("Error syncing session tables:", error);
    }
}

export const getSessions = async (req: Request, res: Response): Promise<void> => {
    try {
        const sessions = await prisma.sessions_backup.findMany({
            select: {
                ID: true,
                SessionId: true,
                Showtime: true,
                SeatsAvailable: true,
                ScreenName: true,
                ScreenNumber: true,
                cinema: {
                    select: {
                        ID: true,
                        Name: true,
                        Latitude: true,
                        Longitude: true,
                        Address1: true,
                        City: true,
                        TimeZoneId: true,
                    }
                },
                scheduledFilm: {
                    select: {
                        ID: true,
                        Title: true,
                        OpeningDate: true,
                    }
                }
            }
        });


        const filteredData = sessions.forEach((session) => {
            session.Showtime = new Date(session.Showtime);
        })

        sendResponse(res, true, filteredData, "", STATUS_CODES.OK);
    } catch (error: any) {
        sendResponse(res, false, error, "server Error", STATUS_CODES.SERVER_ERROR);
    }
}