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