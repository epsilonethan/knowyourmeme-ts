var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class KnowYourMemeClient {
    getSearchUrl(term, offset) {
        const url = new URL(`https://knowyourmeme.com/search?context=images&sort=&q=${term}&offset=${offset}`).toString();
        return url;
    }
    makeRequest(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Referer': 'knowyourmeme.com/search?context=images&sort=&q=hotdogs&offset',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0'
                }
            });
            return response.json();
        });
    }
    generateImageLinkListFromResponse(searchJson) {
        const imageLinks = [];
        searchJson.groups.forEach((group) => {
            group.items.forEach(item => {
                imageLinks.push(item.image);
            });
        });
        return imageLinks;
    }
    retrieveAllImageLinks(searchTerm) {
        return __awaiter(this, void 0, void 0, function* () {
            let pages = 10;
            let imageList = [];
            for (let i = 0; i < pages; i++) {
                const url = this.getSearchUrl(searchTerm, 16 * i);
                const searchJson = yield this.makeRequest(url);
                if (i === 0) {
                    const actualPageCount = Math.ceil(searchJson.total_results / 16);
                    if (actualPageCount < pages) {
                        pages = actualPageCount;
                    }
                }
                imageList.push(...this.generateImageLinkListFromResponse(searchJson));
            }
            return imageList;
        });
    }
}
