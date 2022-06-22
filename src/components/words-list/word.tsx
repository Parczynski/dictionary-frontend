import './words.scss'

export interface IWord {
    _id: string,
    word: string,
    meaning: string,
    examples: string
}

export const Word = ( { _id, word, meaning, examples }: IWord) => {
    return (
    <div className="word" key={_id}>
        <div className="title">{word}</div>
        <div className="meaning">{meaning}</div>
        <div className="example">{examples}</div>
    </div>
    )
}