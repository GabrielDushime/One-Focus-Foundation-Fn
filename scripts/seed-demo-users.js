/**
 * Seed Script - Creates 3 Demo Users in the Database
 * 
 * This script creates demo users:
 * - Admin: admin@demo.com / Admin@123
 * - Editor: editor@demo.com / Editor@123
 * - User: user@demo.com / User@123
 * 
 * Note: The backend doesn't allow setting role during registration.
 * Users will be created with default role. You may need to manually 
 * update their roles in the database or through an admin API.
 * 
 * Run this script with: node scripts/seed-demo-users.js
 */

const API_BASE_URL = 'https://onefocus-fou.onrender.com';

const demoUsers = [
  {
    email: 'admin@demo.com',
    password: 'Admin@123',
    fullName: 'Admin User'
  },
  {
    email: 'editor@demo.com',
    password: 'Editor@123',
    fullName: 'Editor User'
  },
  {
    email: 'user@demo.com',
    password: 'User@123',
    fullName: 'Regular User'
  }
];

async function seedDemoUsers() {
  console.log('🌱 Starting demo users seed...\n');
  console.log('Note: Roles will need to be assigned manually in the database or via admin API.\n');
  
  for (const user of demoUsers) {
    try {
      // Try to register the user
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`✅ Created user: ${user.email}`);
        console.log(`   Password: ${user.password}`);
        console.log(`   Note: Assign role manually or through admin API\n`);
      } else {
        if (data.message && (data.message.includes('already exists') || data.message.includes('duplicate'))) {
          console.log(`⚠️  User already exists: ${user.email}`);
          console.log(`   Password: ${user.password}`);
          console.log(`   Note: Assign role manually or through admin API\n`);
        } else {
          console.log(`❌ Failed to create user ${user.email}:`, data.message || data[0] || 'Unknown error');
        }
      }
    } catch (error) {
      console.error(`❌ Error creating user ${user.email}:`, error.message);
    }
  }

  console.log('\n🌱 Seed completed!\n');
  console.log('=================================');
  console.log('Demo Credentials (after role assignment):');
  console.log('=================================');
  console.log('Admin:  admin@demo.com / Admin@123');
  console.log('Editor: editor@demo.com / Editor@123');
  console.log('User:   user@demo.com / User@123');
  console.log('=================================\n');
  console.log('IMPORTANT: You need to manually assign roles to these users in your database.');
  console.log('In MongoDB, update each user document with: { role: "admin" | "editor" | "user" }');
}

// Run if called directly
if (require.main === module) {
  seedDemoUsers();
}

module.exports = { seedDemoUsers, demoUsers };
