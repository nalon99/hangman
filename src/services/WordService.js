class WordService {

    async getNew() {
        let response = await fetch("https://random-word-api.herokuapp.com/word?number=1");
        let words = await response.json();
        return words[0];
    }

}

export default new WordService();
