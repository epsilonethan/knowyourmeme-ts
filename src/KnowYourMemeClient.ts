import {ApiResponse} from './interfaces/ApiResponse'

export class KnowYourMemeClient {
    async search(term: string, pages: number = 1){
        let imageLinks: Array<string> = []

        for (let i = 0; i < pages; i++) {
            const url = new URL(`https://knowyourmeme.com/search?context=images&sort=&q=${term}&offset=${16 * i}`)

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

            const searchJson: ApiResponse = await response.json();

            if (i === 0) {
                const actualPageCount = Math.ceil(searchJson.total_results / 16)
                if (actualPageCount < pages) {
                    pages = actualPageCount
                }
            }

            searchJson.groups.forEach((group) => {
                group.items.forEach(item => {
                    imageLinks.push(item.image);
                });
            });
        }

        return imageLinks
    }

}