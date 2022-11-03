const { Router } = require('express');
const { Op, Character, Role } = require('../db');
const router = Router();


router.post('/', async (req, res) => {
    let {code, name, age, race, hp, mana, date_added} = req.body
    try{
        if(!code || !name || !hp || !mana ){
            return res.status(404).send("Falta enviar datos obligatorios")
        }

        const newCharacter = await Character.create({
            code,
            name,
            age,
            race,
            hp,
            mana,
            date_added
        });

        res.status(201).send(newCharacter);

    }catch(e){
        res.status(404).send("Error en alguno de los datos provistos")
    }
})

router.get('/', async (req, res) => {
    let {race} = req.query
    try{
        if(!race){
            const charactersByRace = await Character.findAll()
            return res.status(200).send(charactersByRace)
        }

        const charactersByRace = await Character.findAll({
            where: {race: race}  
        });

        res.status(200).send(charactersByRace.length > 0 ? charactersByRace : "No coincidences");

    }catch(e){

        res.status(404).send(e)
    }
})

module.exports = router;