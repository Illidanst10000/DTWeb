import React, {useState} from 'react';
import {CharactersList} from "../models/characters/CharactersData";
import './ArmyConstructor.css'
import {getToken} from "../utils";


const characterOptions = [
    { label: "Knight", value: CharactersList.KNIGHT },
    { label: "Hero Archmage", value: CharactersList.HERO_ARCHMAGE },
    { label: "Hero Ranger", value: CharactersList.HERO_RANGER },
    { label: "Saint", value: CharactersList.SAINT },
];

interface Coordinate {
    x: number;
    y: number;
}

interface CharacterAssignment {
    coordinate: Coordinate;
    character: string;
}

interface Assignments {
    top: CharacterAssignment[];
    bottom: CharacterAssignment[];
}

const ArmyConstructorComponent = () => {

    const initialCells = Array(12).fill(null).map((_, i) => ({
        coordinate: { x: i % 6, y: Math.floor(i / 6) },
        character: ''
    }));

    const [assignments, setAssignments] = useState(initialCells);

    const handleSelectChange = (index: number, value: string) => {
        const updatedAssignments = [...assignments];
        updatedAssignments[index].character = value;
        setAssignments(updatedAssignments);
    };

    const handleSubmit = () => {
        const validAssignments = assignments.filter(cell => cell.character !== '')
        const token = localStorage.getItem('token');

        console.log('Assignments to send:', validAssignments);

        // Send the data to the backend
        fetch('http://localhost:5000/users/army', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Include JWT token in the Authorization header
            },
            body: JSON.stringify({ assignments: validAssignments }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="board-container">
            <div className="row">
                {assignments.map((cell, index) => (
                    <div key={`cell-${index}`} className="cell">
                        <select
                            value={cell.character}
                            onChange={(e) => handleSelectChange(index, e.target.value)}
                        >
                            <option value="">Select Character</option>
                            {Object.entries(CharactersList).map(([key, value]) => (
                                <option key={key} value={key}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                ))}
            </div>
            <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default ArmyConstructorComponent;

