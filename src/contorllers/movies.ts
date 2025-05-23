import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { isEqual } from "../utils/isEqual";

export const upsertMoviesData = async (moviesData: any[]): Promise<number> => {
    try {
        const moviesDataFromDb = await prisma.movies.findMany();
        const moviesDataFromDbMap = new Map(moviesDataFromDb.map(m => [m.ID, m]));
        const moviesToUpsert = moviesData.filter(movie => {
            const movieFromDb = moviesDataFromDbMap.get(movie.ID);
            if (!movieFromDb) return true;

            const fieldsToCompare = [
                "AdditionalUrls", "ShortCode", "Title", "Rating", "RatingDescription", "Synopsis", "SynopsisAlt", "SynopsisTranslations", "ShortSynopsis", "HOFilmCode", "CorporateFilmId", "RunTime", "OpeningDate", "GraphicUrl", "FilmNameUrl", "TrailerUrl", "IsComingSoon", "IsScheduledAtCinema", "TitleAlt", "RatingAlt", "RatingDescriptionAlt", "ShortSynopsisAlt", "WebsiteUrl", "GenreId", "GenreId2", "GenreId3", "EDICode", "FormatCodes", "TwitterTag", "TitleTranslations", "ShortSynopsisTranslations", "RatingDescriptionTranslations", "CustomerRatingStatistics", "CustomerRatingTrailerStatistics", "FilmWebId", "MovieXchangeCode", "DistributorName", "GovernmentCode"
            ] as const;

            for (const field of fieldsToCompare) {
                if (!isEqual(movie[field], movieFromDb[field])) {
                    console.log(`Field changed: ${field}`, {
                        from: movieFromDb[field],
                        to: movie[field]
                    });
                    return true;
                }
            }

            return false;
        });

        for (const movie of moviesToUpsert) {
            if (!movie.ID) continue;

            await prisma.movies.upsert({
                where: { ID: movie.ID },
                update: {
                    AdditionalUrls: movie.AdditionalUrls,
                    ShortCode: movie.ShortCode,
                    Title: movie.Title,
                    Rating: movie.Rating,
                    RatingDescription: movie.RatingDescription,
                    Synopsis: movie.Synopsis,
                    SynopsisAlt: movie.SynopsisAlt,
                    SynopsisTranslations: movie.SynopsisTranslations,
                    ShortSynopsis: movie.ShortSynopsis,
                    HOFilmCode: movie.HOFilmCode,
                    CorporateFilmId: movie.CorporateFilmId,
                    RunTime: movie.RunTime,
                    OpeningDate: movie.OpeningDate ? movie.OpeningDate : null,
                    GraphicUrl: movie.GraphicUrl,
                    FilmNameUrl: movie.FilmNameUrl,
                    TrailerUrl: movie.TrailerUrl,
                    IsComingSoon: movie.IsComingSoon,
                    IsScheduledAtCinema: movie.IsScheduledAtCinema,
                    TitleAlt: movie.TitleAlt,
                    RatingAlt: movie.RatingAlt,
                    RatingDescriptionAlt: movie.RatingDescriptionAlt,
                    ShortSynopsisAlt: movie.ShortSynopsisAlt,
                    WebsiteUrl: movie.WebsiteUrl,
                    GenreId: movie.GenreId,
                    GenreId2: movie.GenreId2,
                    GenreId3: movie.GenreId3,
                    EDICode: movie.EDICode,
                    FormatCodes: movie.FormatCodes,
                    TwitterTag: movie.TwitterTag,
                    TitleTranslations: movie.TitleTranslations,
                    ShortSynopsisTranslations: movie.ShortSynopsisTranslations,
                    RatingDescriptionTranslations: movie.RatingDescriptionTranslations,
                    CustomerRatingStatistics: movie.CustomerRatingStatistics,
                    CustomerRatingTrailerStatistics: movie.CustomerRatingTrailerStatistics,
                    FilmWebId: movie.FilmWebId,
                    MovieXchangeCode: movie.MovieXchangeCode,
                    DistributorName: movie.DistributorName,
                    GovernmentCode: movie.GovernmentCode,
                },
                create: {
                    ID: movie.ID,
                    AdditionalUrls: movie.AdditionalUrls,
                    ShortCode: movie.ShortCode,
                    Title: movie.Title,
                    Rating: movie.Rating,
                    RatingDescription: movie.RatingDescription,
                    Synopsis: movie.Synopsis,
                    SynopsisAlt: movie.SynopsisAlt,
                    SynopsisTranslations: movie.SynopsisTranslations,
                    ShortSynopsis: movie.ShortSynopsis,
                    HOFilmCode: movie.HOFilmCode,
                    CorporateFilmId: movie.CorporateFilmId,
                    RunTime: movie.RunTime,
                    OpeningDate: movie.OpeningDate ? movie.OpeningDate : null,
                    GraphicUrl: movie.GraphicUrl,
                    FilmNameUrl: movie.FilmNameUrl,
                    TrailerUrl: movie.TrailerUrl,
                    IsComingSoon: movie.IsComingSoon,
                    IsScheduledAtCinema: movie.IsScheduledAtCinema,
                    TitleAlt: movie.TitleAlt,
                    RatingAlt: movie.RatingAlt,
                    RatingDescriptionAlt: movie.RatingDescriptionAlt,
                    ShortSynopsisAlt: movie.ShortSynopsisAlt,
                    WebsiteUrl: movie.WebsiteUrl,
                    GenreId: movie.GenreId,
                    GenreId2: movie.GenreId2,
                    GenreId3: movie.GenreId3,
                    EDICode: movie.EDICode,
                    FormatCodes: movie.FormatCodes,
                    TwitterTag: movie.TwitterTag,
                    TitleTranslations: movie.TitleTranslations,
                    ShortSynopsisTranslations: movie.ShortSynopsisTranslations,
                    RatingDescriptionTranslations: movie.RatingDescriptionTranslations,
                    CustomerRatingStatistics: movie.CustomerRatingStatistics,
                    CustomerRatingTrailerStatistics: movie.CustomerRatingTrailerStatistics,
                    FilmWebId: movie.FilmWebId,
                    MovieXchangeCode: movie.MovieXchangeCode,
                    DistributorName: movie.DistributorName,
                    GovernmentCode: movie.GovernmentCode,
                },
            });
        }

        console.log("Movie data upserted successfully.");
        return moviesToUpsert.length;
    } catch (error: any) {
        console.error("Error upserting movie data:", error);
        return 0;
    }
};

export const syncMoviesTables = async (): Promise<void> => {
    try {
        const sourceMovies = await prisma.movies.findMany();
        const targetMovies = await prisma.movies_backup.findMany();

        const targetMoviesMap = new Map(targetMovies.map(m => [m.ID, m]));

        const moviesToUpsert = sourceMovies.filter(movie => {
            const targetMovie = targetMoviesMap.get(movie.ID);
            if (!targetMovie) return true;

            const fieldsToCompare = [
                "AdditionalUrls", "ShortCode", "Title", "Rating", "RatingDescription", "Synopsis", "SynopsisAlt", "SynopsisTranslations", "ShortSynopsis", "HOFilmCode", "CorporateFilmId", "RunTime", "OpeningDate", "GraphicUrl", "FilmNameUrl", "TrailerUrl", "IsComingSoon", "IsScheduledAtCinema", "TitleAlt", "RatingAlt", "RatingDescriptionAlt", "ShortSynopsisAlt", "WebsiteUrl", "GenreId", "GenreId2", "GenreId3", "EDICode", "FormatCodes", "TwitterTag", "TitleTranslations", "ShortSynopsisTranslations", "RatingDescriptionTranslations", "CustomerRatingStatistics", "CustomerRatingTrailerStatistics", "FilmWebId", "MovieXchangeCode", "DistributorName", "GovernmentCode"
            ] as const;

            return fieldsToCompare.some(field => !isEqual(movie[field], targetMovie[field]));
        });

        for (const movie of moviesToUpsert) {
            if (!movie.ID) continue;

            await prisma.movies_backup.upsert({
                where: { ID: movie.ID },
                update: {
                    AdditionalUrls: movie.AdditionalUrls === null ? Prisma.JsonNull : movie.AdditionalUrls,
                    ShortCode: movie.ShortCode,
                    Title: movie.Title,
                    Rating: movie.Rating,
                    RatingDescription: movie.RatingDescription,
                    Synopsis: movie.Synopsis,
                    SynopsisAlt: movie.SynopsisAlt,
                    SynopsisTranslations: movie.SynopsisTranslations === null ? Prisma.JsonNull : movie.SynopsisTranslations,
                    ShortSynopsis: movie.ShortSynopsis,
                    HOFilmCode: movie.HOFilmCode,
                    CorporateFilmId: movie.CorporateFilmId,
                    RunTime: movie.RunTime,
                    OpeningDate: movie.OpeningDate ? `${movie.OpeningDate}.000Z` : null,
                    GraphicUrl: movie.GraphicUrl,
                    FilmNameUrl: movie.FilmNameUrl,
                    TrailerUrl: movie.TrailerUrl,
                    IsComingSoon: movie.IsComingSoon,
                    IsScheduledAtCinema: movie.IsScheduledAtCinema,
                    TitleAlt: movie.TitleAlt,
                    RatingAlt: movie.RatingAlt,
                    RatingDescriptionAlt: movie.RatingDescriptionAlt,
                    ShortSynopsisAlt: movie.ShortSynopsisAlt,
                    WebsiteUrl: movie.WebsiteUrl,
                    GenreId: movie.GenreId,
                    GenreId2: movie.GenreId2,
                    GenreId3: movie.GenreId3,
                    EDICode: movie.EDICode,
                    FormatCodes: movie.FormatCodes === null ? Prisma.JsonNull : movie.FormatCodes,
                    TwitterTag: movie.TwitterTag,
                    TitleTranslations: movie.TitleTranslations === null ? Prisma.JsonNull : movie.TitleTranslations,
                    ShortSynopsisTranslations: movie.ShortSynopsisTranslations === null ? Prisma.JsonNull : movie.ShortSynopsisTranslations,
                    RatingDescriptionTranslations: movie.RatingDescriptionTranslations === null ? Prisma.JsonNull : movie.RatingDescriptionTranslations,
                    CustomerRatingStatistics: movie.CustomerRatingStatistics === null ? Prisma.JsonNull : movie.CustomerRatingStatistics,
                    CustomerRatingTrailerStatistics: movie.CustomerRatingTrailerStatistics === null ? Prisma.JsonNull : movie.CustomerRatingTrailerStatistics,
                    FilmWebId: movie.FilmWebId,
                    MovieXchangeCode: movie.MovieXchangeCode,
                    DistributorName: movie.DistributorName,
                    GovernmentCode: movie.GovernmentCode,
                },
                create: {
                    ID: movie.ID,
                    AdditionalUrls: movie.AdditionalUrls === null ? Prisma.JsonNull : movie.AdditionalUrls,
                    ShortCode: movie.ShortCode,
                    Title: movie.Title,
                    Rating: movie.Rating,
                    RatingDescription: movie.RatingDescription,
                    Synopsis: movie.Synopsis,
                    SynopsisAlt: movie.SynopsisAlt,
                    SynopsisTranslations: movie.SynopsisTranslations === null ? Prisma.JsonNull : movie.SynopsisTranslations,
                    ShortSynopsis: movie.ShortSynopsis,
                    HOFilmCode: movie.HOFilmCode,
                    CorporateFilmId: movie.CorporateFilmId,
                    RunTime: movie.RunTime,
                    OpeningDate: movie.OpeningDate ? new Date(movie.OpeningDate) : null,
                    GraphicUrl: movie.GraphicUrl,
                    FilmNameUrl: movie.FilmNameUrl,
                    TrailerUrl: movie.TrailerUrl,
                    IsComingSoon: movie.IsComingSoon,
                    IsScheduledAtCinema: movie.IsScheduledAtCinema,
                    TitleAlt: movie.TitleAlt,
                    RatingAlt: movie.RatingAlt,
                    RatingDescriptionAlt: movie.RatingDescriptionAlt,
                    ShortSynopsisAlt: movie.ShortSynopsisAlt,
                    WebsiteUrl: movie.WebsiteUrl,
                    GenreId: movie.GenreId,
                    GenreId2: movie.GenreId2,
                    GenreId3: movie.GenreId3,
                    EDICode: movie.EDICode,
                    FormatCodes: movie.FormatCodes === null ? Prisma.JsonNull : movie.FormatCodes,
                    TwitterTag: movie.TwitterTag,
                    TitleTranslations: movie.TitleTranslations === null ? Prisma.JsonNull : movie.TitleTranslations,
                    ShortSynopsisTranslations: movie.ShortSynopsisTranslations === null ? Prisma.JsonNull : movie.ShortSynopsisTranslations,
                    RatingDescriptionTranslations: movie.RatingDescriptionTranslations === null ? Prisma.JsonNull : movie.RatingDescriptionTranslations,
                    CustomerRatingStatistics: movie.CustomerRatingStatistics === null ? Prisma.JsonNull : movie.CustomerRatingStatistics,
                    CustomerRatingTrailerStatistics: movie.CustomerRatingTrailerStatistics === null ? Prisma.JsonNull : movie.CustomerRatingTrailerStatistics,
                    FilmWebId: movie.FilmWebId,
                    MovieXchangeCode: movie.MovieXchangeCode,
                    DistributorName: movie.DistributorName,
                    GovernmentCode: movie.GovernmentCode,
                },
            });
        }

        console.log("Movie Table Synced successfully.");

    } catch (error: any) {
        console.error("Error upserting movie data:", error);
    }
};