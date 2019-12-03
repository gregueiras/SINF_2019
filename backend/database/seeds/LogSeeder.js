const Factory = use('Factory')
const Database = use('Database')

class LogSeeder {
    async run() {
        await Factory.model('App/Models/Log').createMany(5);
    }
}

module.exports = LogSeeder;