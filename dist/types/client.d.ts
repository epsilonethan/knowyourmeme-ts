export declare class KnowYourMemeClient {
    private getSearchUrl;
    private makeRequest;
    private generateImageLinkListFromResponse;
    retrieveAllImageLinks(searchTerm: string): Promise<string[]>;
}
