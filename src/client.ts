import {ApiResponse} from './interfaces/api-response'

export class KnowYourMemeClient {
    private getSearchUrl(term: string, offset: number) {
        const url = new URL(`https://knowyourmeme.com/search?context=images&sort=&q=${term}&offset=${offset}`).toString()
        return url
    }

    private async makeRequest(url: string): Promise<ApiResponse> {
        const response = await fetch(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'knowyourmeme.com/search?context=images&sort=&q=hotdogs&offset',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0'
                }
            }
        );
    
        return response.json()
    }

    private generateImageLinkListFromResponse(searchJson: ApiResponse): Array<string> {
        const imageLinks: Array<string> = []
        searchJson.groups.forEach((group) => {
            group.items.forEach(item => {
                imageLinks.push(item.image);
            });
        });
        
        return imageLinks
    }

    async retrieveAllImageLinks(searchTerm: string) {
        let pages = 10
        let imageList = []

        for (let i = 0; i < pages; i++) {
            const url = this.getSearchUrl(searchTerm, 16 * i)
            const searchJson = await this.makeRequest(url)
            if (i === 0) {
                const actualPageCount = Math.ceil(searchJson.total_results / 16)
                if (actualPageCount < pages) {
                    pages = actualPageCount
                }
            }
            imageList.push(...this.generateImageLinkListFromResponse(searchJson))
        }

        return imageList
    }

}