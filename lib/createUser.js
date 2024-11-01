import User from "@/models/User";

export default async function handleUserCreation(data) {
    const { id, email_addresses, first_name, last_name } = data.data;

    try {
        // Check if a user with the same clerkId already exists
        let user = await User.findOne({ clerkId: id });

        if (user) {
            console.log("User is already existed!");
        } else {
            // Create a new user
            user = await User.create({
                clerkId: id,
                email: email_addresses[0]?.email_address,
                firstName: first_name,
                lastName: last_name,
            });
            console.log("User created!")
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to handle user creation");
    }
}
