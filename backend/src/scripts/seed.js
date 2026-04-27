const { sequelize, User, Election, Candidate } = require('../models');

async function seed() {
    try {
        // Do NOT call sequelize.sync() here. Server already syncs tables.

        // Create election if not exists
        let election = await Election.findOne({ where: { name: 'Demo Election' } });

        if (!election) {
            election = await Election.create({
                name: 'Demo Election',
                status: 'live',
                startTime: new Date(),
                endTime: new Date(Date.now() + 3600 * 1000),
                level: 'local'
            });
        } else {
            await election.update({
                status: 'live'
            });
        }

        // Create candidates
        const candidates = [
            { name: 'Alice Johnson', party: 'Progressive Alliance', symbol: 'A', electionId: election.id, constituency: 'Demo', constituencyType: 'general', state: 'DemoState' },
            { name: 'Bob Smith', party: 'Democratic Union', symbol: 'B', electionId: election.id, constituency: 'Demo', constituencyType: 'general', state: 'DemoState' },
            { name: 'Carol White', party: 'National Party', symbol: 'C', electionId: election.id, constituency: 'Demo', constituencyType: 'general', state: 'DemoState' },
            { name: 'David Brown', party: 'People\'s Movement', symbol: 'D', electionId: election.id, constituency: 'Demo', constituencyType: 'general', state: 'DemoState' },
            { name: 'Emma Davis', party: 'Reform League', symbol: 'E', electionId: election.id, constituency: 'Demo', constituencyType: 'general', state: 'DemoState' },
            { name: 'Frank Miller', party: 'Independent', symbol: 'F', electionId: election.id, constituency: 'Demo', constituencyType: 'general', state: 'DemoState' },
        ];

        for (const c of candidates) {
            const exists = await Candidate.findOne({ where: { name: c.name, electionId: c.electionId } });
            if (!exists) {
                await Candidate.create(c);
                console.log('Created candidate', c.name);
            }
        }

        // Create a test voter (password will be hashed by User model hook)
        const voterId = 'voter1';
        let user = await User.findByPk(voterId);
        if (!user) {
            await User.create({ voterId, aadharNo: '0000', name: 'Test Voter', email: 'voter@example.com', role: 'voter', gender: 'other', mobileNo: '0000000000', password: 'password123' });
            console.log('Created test voter: voter1 / password123');
        }
        // Create multiple test voters
        const voters = [
            { voterId: 'voter2', password: '123456' },
            { voterId: 'voter3', password: '123456' },
            { voterId: 'voter4', password: '123456' }
        ];

        for (const v of voters) {
            let exists = await User.findByPk(v.voterId);
            if (!exists) {
                await User.create({
                    voterId: v.voterId,
                    aadharNo: '1111' + v.voterId,
                    name: 'Test ' + v.voterId,
                    email: v.voterId + '@example.com',
                    role: 'voter',
                    gender: 'other',
                    mobileNo: '99999' + Math.floor(Math.random() * 100000),
                    password: v.password
                });

                console.log(`Created test voter: ${v.voterId} / ${v.password}`);
            }
        }

        // Create a test admin (password will be hashed by User model hook)
        const adminId = 'admin1';
        let admin = await User.findByPk(adminId);
        if (!admin) {
            await User.create({ voterId: adminId, aadharNo: '9999', name: 'Test Admin', email: 'admin@example.com', role: 'admin', gender: 'other', mobileNo: '9999999999', password: 'admin123' });
            console.log('Created test admin: admin1 / admin123');
        }

        console.log('Seeding complete');
    } catch (err) {
        console.error('Seeding error', err);
    }
}

module.exports = { seed };

// If script is run directly, seed (useful for manual runs)
if (require.main === module) {
    seed().then(() => process.exit(0)).catch(() => process.exit(1));
}