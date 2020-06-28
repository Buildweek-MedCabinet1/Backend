const db = require('../connection.js');
const Medcab = require('./medcab-model');


describe('medcab model', ()=>{

    describe('findPatient', ()=>{
        it('should find the list of all patients', async ()=>{
            const patients = await Medcab.findPatient()
            expect(patients).toHaveLength(2)
        })
    })

    describe('findStrain', ()=>{
        it('should find the list of all strains', async ()=>{
            const Strains = await Medcab.findStrain()
            expect(Strains).toHaveLength(2)
        })
    })

    describe('findPatientById', ()=>{
        it('should find a patient using their id', async ()=>{
            const patient = await Medcab.findPatientById(1)
            expect(patient.patient_name).toBe('Yahzick')
        })
    })

    describe('findStrainsById', ()=>{
        it('should find a strain using its id', async ()=>{
            const strain = await Medcab.findStrainById(1)
            expect(strain.strain_name).toBe('Northern Lights')
        })
    })







})