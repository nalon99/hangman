class WordService {

    async getNew() {
        return Promise.resolve("secretword");
        // return new Promise((resolve) => {
        //     process.nextTick(() => { resolve("secretword") });
        // });
    }

}

export default new WordService();
