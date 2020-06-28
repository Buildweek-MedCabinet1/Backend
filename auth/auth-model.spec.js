const db = require('../database/connection.js');
const Auth = require('./auth-model');




describe('auth-model', ()=>{

    describe('find()',()=>{
        it('should return all users in database', async()=>{
            const users = await Auth.find()
            expect(users).toHaveLength(1)
        })
    })

   
    describe('add()', ()=>{
        it('should insert a user into the database', async()=>{
            await Auth.add({username:'guy',password:'ham'})

            const users = await db('users')
            expect(users).toHaveLength(1)
        })

        beforeEach(async()=>{
            await db('users').truncate()
        })
        //watch this here, the above two work, but when the DB is truncated the top will fail for a pass

    })

    describe('findbyId()',()=>{
        it('should return a user by id', async()=>{
            const user = await Auth.findById(1)
            expect(user.username).toBe('guy')
        })
    })


})