import prisma from "../prisma";
import { Prisma } from '@prisma/client';


export const upsertCinemaData = async (cinemaData: any[]): Promise<number> => {
    try {
        for (const cinema of cinemaData) {
            if (!cinema.ID) continue;

            await prisma.cinemas.upsert({
                where: { ID: cinema.ID },
                update: {
                    Name: cinema.Name,
                    NameAlt: cinema.NameAlt,
                    PhoneNumber: cinema.PhoneNumber,
                    EmailAddress: cinema.EmailAddress,
                    Address1: cinema.Address1,
                    Address2: cinema.Address2,
                    City: cinema.City,
                    Latitude: cinema.Latitude,
                    Longitude: cinema.Longitude,
                    ParkingInfo: cinema.ParkingInfo,
                    LoyaltyCode: cinema.LoyaltyCode,
                    IsGiftStore: cinema.IsGiftStore,
                    Description: cinema.Description,
                    DescriptionAlt: cinema.DescriptionAlt,
                    PublicTransport: cinema.PublicTransport,
                    CurrencyCode: cinema.CurrencyCode,
                    AllowPrintAtHomeBookings: cinema.AllowPrintAtHomeBookings,
                    AllowOnlineVoucherValidation: cinema.AllowOnlineVoucherValidation,
                    DisplaySofaSeats: cinema.DisplaySofaSeats,
                    TimeZoneId: cinema.TimeZoneId,
                    HOPK: cinema.HOPK,
                    NameTranslations: cinema.NameTranslations,
                    DescriptionTranslations: cinema.DescriptionTranslations,
                    ParkingInfoTranslations: cinema.ParkingInfoTranslations,
                    PublicTransportTranslations: cinema.PublicTransportTranslations,
                    TipsCompulsory: cinema.TipsCompulsory,
                    TipPercentages: cinema.TipPercentages,
                    ServerName: cinema.ServerName,
                    IsInTouchEnabled: cinema.IsInTouchEnabled,
                    IsGetHelpEnabled: cinema.IsGetHelpEnabled,
                    PrimaryDataLanguage: cinema.PrimaryDataLanguage,
                    AlternateDataLanguage1: cinema.AlternateDataLanguage1,
                    AlternateDataLanguage2: cinema.AlternateDataLanguage2,
                    AlternateDataLanguage3: cinema.AlternateDataLanguage3,
                    HasConcessions: cinema.HasConcessions,
                },
                create: {
                    ID: cinema.ID,
                    CinemaNationalId: cinema.CinemaNationalId,
                    Name: cinema.Name,
                    NameAlt: cinema.NameAlt,
                    PhoneNumber: cinema.PhoneNumber,
                    EmailAddress: cinema.EmailAddress,
                    Address1: cinema.Address1,
                    Address2: cinema.Address2,
                    City: cinema.City,
                    Latitude: cinema.Latitude,
                    Longitude: cinema.Longitude,
                    ParkingInfo: cinema.ParkingInfo,
                    LoyaltyCode: cinema.LoyaltyCode,
                    IsGiftStore: cinema.IsGiftStore,
                    Description: cinema.Description,
                    DescriptionAlt: cinema.DescriptionAlt,
                    PublicTransport: cinema.PublicTransport,
                    CurrencyCode: cinema.CurrencyCode,
                    AllowPrintAtHomeBookings: cinema.AllowPrintAtHomeBookings,
                    AllowOnlineVoucherValidation: cinema.AllowOnlineVoucherValidation,
                    DisplaySofaSeats: cinema.DisplaySofaSeats,
                    TimeZoneId: cinema.TimeZoneId,
                    HOPK: cinema.HOPK,
                    NameTranslations: cinema.NameTranslations,
                    DescriptionTranslations: cinema.DescriptionTranslations,
                    ParkingInfoTranslations: cinema.ParkingInfoTranslations,
                    PublicTransportTranslations: cinema.PublicTransportTranslations,
                    TipsCompulsory: cinema.TipsCompulsory,
                    TipPercentages: cinema.TipPercentages,
                    ServerName: cinema.ServerName,
                    IsInTouchEnabled: cinema.IsInTouchEnabled,
                    IsGetHelpEnabled: cinema.IsGetHelpEnabled,
                    PrimaryDataLanguage: cinema.PrimaryDataLanguage,
                    AlternateDataLanguage1: cinema.AlternateDataLanguage1,
                    AlternateDataLanguage2: cinema.AlternateDataLanguage2,
                    AlternateDataLanguage3: cinema.AlternateDataLanguage3,
                    HasConcessions: cinema.HasConcessions,
                },
            });
        }
        console.log("Cinema data upserted successfully.");

        return cinemaData.values.length;
    } catch (error: any) {
        console.error("Error upserting cinema data:", error);
        return 0;
    }
};


export const syncCinemaTables = async (): Promise<number> => {
    try {

        const cinemaData = await prisma.cinemas.findMany();

        if (!cinemaData) {
            throw new Error("Cinema data not found in main table");
        };

        for (const cinema of cinemaData) {
            if (!cinema.ID) continue;

            await prisma.cinemas_backup.upsert({
                where: { ID: cinema.ID },
                update: {
                    Name: cinema.Name,
                    NameAlt: cinema.NameAlt,
                    PhoneNumber: cinema.PhoneNumber,
                    EmailAddress: cinema.EmailAddress,
                    Address1: cinema.Address1,
                    Address2: cinema.Address2,
                    City: cinema.City,
                    Latitude: cinema.Latitude,
                    Longitude: cinema.Longitude,
                    ParkingInfo: cinema.ParkingInfo,
                    LoyaltyCode: cinema.LoyaltyCode,
                    IsGiftStore: cinema.IsGiftStore,
                    Description: cinema.Description,
                    DescriptionAlt: cinema.DescriptionAlt,
                    PublicTransport: cinema.PublicTransport,
                    CurrencyCode: cinema.CurrencyCode,
                    AllowPrintAtHomeBookings: cinema.AllowPrintAtHomeBookings,
                    AllowOnlineVoucherValidation: cinema.AllowOnlineVoucherValidation,
                    DisplaySofaSeats: cinema.DisplaySofaSeats,
                    TimeZoneId: cinema.TimeZoneId,
                    HOPK: cinema.HOPK,
                    NameTranslations: cinema.NameTranslations === null ? Prisma.JsonNull : cinema.NameTranslations,
                    DescriptionTranslations: cinema.DescriptionTranslations === null ? Prisma.JsonNull : cinema.DescriptionTranslations,
                    ParkingInfoTranslations: cinema.ParkingInfoTranslations === null ? Prisma.JsonNull : cinema.ParkingInfoTranslations,
                    PublicTransportTranslations: cinema.PublicTransportTranslations === null ? Prisma.JsonNull : cinema.PublicTransportTranslations,
                    TipsCompulsory: cinema.TipsCompulsory,
                    TipPercentages: cinema.TipPercentages,
                    ServerName: cinema.ServerName,
                    IsInTouchEnabled: cinema.IsInTouchEnabled,
                    IsGetHelpEnabled: cinema.IsGetHelpEnabled,
                    PrimaryDataLanguage: cinema.PrimaryDataLanguage,
                    AlternateDataLanguage1: cinema.AlternateDataLanguage1,
                    AlternateDataLanguage2: cinema.AlternateDataLanguage2,
                    AlternateDataLanguage3: cinema.AlternateDataLanguage3,
                    HasConcessions: cinema.HasConcessions,
                },
                create: {
                    ID: cinema.ID,
                    CinemaNationalId: cinema.CinemaNationalId,
                    Name: cinema.Name,
                    NameAlt: cinema.NameAlt,
                    PhoneNumber: cinema.PhoneNumber,
                    EmailAddress: cinema.EmailAddress,
                    Address1: cinema.Address1,
                    Address2: cinema.Address2,
                    City: cinema.City,
                    Latitude: cinema.Latitude,
                    Longitude: cinema.Longitude,
                    ParkingInfo: cinema.ParkingInfo,
                    LoyaltyCode: cinema.LoyaltyCode,
                    IsGiftStore: cinema.IsGiftStore,
                    Description: cinema.Description,
                    DescriptionAlt: cinema.DescriptionAlt,
                    PublicTransport: cinema.PublicTransport,
                    CurrencyCode: cinema.CurrencyCode,
                    AllowPrintAtHomeBookings: cinema.AllowPrintAtHomeBookings,
                    AllowOnlineVoucherValidation: cinema.AllowOnlineVoucherValidation,
                    DisplaySofaSeats: cinema.DisplaySofaSeats,
                    TimeZoneId: cinema.TimeZoneId,
                    HOPK: cinema.HOPK,
                    NameTranslations: cinema.NameTranslations === null ? Prisma.JsonNull : cinema.NameTranslations,
                    DescriptionTranslations: cinema.DescriptionTranslations === null ? Prisma.JsonNull : cinema.DescriptionTranslations,
                    ParkingInfoTranslations: cinema.ParkingInfoTranslations === null ? Prisma.JsonNull : cinema.ParkingInfoTranslations,
                    PublicTransportTranslations: cinema.PublicTransportTranslations === null ? Prisma.JsonNull : cinema.PublicTransportTranslations,
                    TipsCompulsory: cinema.TipsCompulsory,
                    TipPercentages: cinema.TipPercentages,
                    ServerName: cinema.ServerName,
                    IsInTouchEnabled: cinema.IsInTouchEnabled,
                    IsGetHelpEnabled: cinema.IsGetHelpEnabled,
                    PrimaryDataLanguage: cinema.PrimaryDataLanguage,
                    AlternateDataLanguage1: cinema.AlternateDataLanguage1,
                    AlternateDataLanguage2: cinema.AlternateDataLanguage2,
                    AlternateDataLanguage3: cinema.AlternateDataLanguage3,
                    HasConcessions: cinema.HasConcessions,
                },
            });
        }

        console.log("Cinema Table synced successfully.");
        const syncedCinemaData: number = await prisma.cinemas_backup.count();

        return syncedCinemaData;

    } catch (error: any) {
        console.error("Error syncing cinema tables:", error);
        return 0;
    }
}