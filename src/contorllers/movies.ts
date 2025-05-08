import { Prisma } from "@prisma/client";
import prisma from "../prisma";


export const upsertMoviesData = async (moviesData: any[]): Promise<void> => {
    try {
        for (const movie of moviesData) {
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
                    OpeningDate: movie.OpeningDate ? new Date(movie.OpeningDate).toISOString() : null,
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
                    OpeningDate: movie.OpeningDate ? new Date(movie.OpeningDate).toISOString() : null,
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
    } catch (error: any) {
        console.error("Error upserting movie data:", error);
    }
};

export const syncMoviesTables = async (): Promise<void> => {
    try {

        const moviesData = await prisma.movies.findMany();

        for (const movie of moviesData) {
            if (!movie.ID) continue;

            await prisma.movies.upsert({
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
                    OpeningDate: movie.OpeningDate ? new Date(movie.OpeningDate).toISOString() : null,
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
                    OpeningDate: movie.OpeningDate ? new Date(movie.OpeningDate).toISOString() : null,
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

