import './words.scss'

export interface IWord {
    _id: string,
    word: string,
    meaning: string,
    examples: string,
    translate: string
}

export const Word = ( { _id, word, meaning, examples, translate }: IWord) => {
    return (
    <div className="word" key={_id}>
        <div className="title">{word}</div>
        <div className="translate">{translate}</div>
        <div className="meaning">{meaning}</div>
        <div className="example">{examples}</div>
    </div>
    )
}