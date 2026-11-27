// Create the app's guest user (mirrors runtime auto-creation) so content seeds work
import { getGuestUserId } from "@/lib/guest-user";

const id = await getGuestUserId();
console.log("guest user ready:", id);
process.exit(0);
