import { getAuthenticatedUser } from "@/actions/auth"
import { seedUser } from "@/actions/user"

const mainLayout = async ({ children }) => {
    const { user } = await getAuthenticatedUser();
    if (!user) await seedUser();
    return (
        <div className="container mx-auto mt-24 mb-20">{children}</div>
    )
}

export default mainLayout