import styles from './MediaListNames.module.css';

const numberOfPeopleToDisplay = 3;

export default function MediaListNames({ people = [] }) {

    if (!Array.isArray(people)) throw Error('Names must be an array');

    const formattedPeople = people.slice(0, numberOfPeopleToDisplay);

    if (formattedPeople.length === 0) return null;

    return (
        <div className={styles.wrapper}>
            <span>From</span>
            <ul className={styles.peopleList}>
                {formattedPeople.map((person, index) => (
                    <li key={person.id}>
                        {person.name}
                        {index < formattedPeople.length - 1 ? ',' : ''}
                    </li>
                ))}
            </ul>
        </div>
    );

}
