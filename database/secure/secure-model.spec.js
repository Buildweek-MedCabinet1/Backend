const db = require('../connection');
const Sec = require('./secure-model');

    describe('secure model', ()=>{

        describe('get()', ()=>{
            it('should return all users', async ()=>{
                const users = await Sec.get()
                expect(users).toHaveLength(3)
            })
        })

      

        describe('addFavorite', ()=>{
            it('should insert a favorite into the database', async ()=>{
                await Sec.addFavorite({strain:'Brazil',db_id:1,user_id:1})
                const fav = await Sec.findFavById(4)

                expect(fav.strain).toBe('Brazil')
            })
        })

       
        





    })