import Logo from "../Logo/Logo";

export default function AppBar() {
    return (
        <div className="flex flex-row">
            <div className="flex flex-row items-center">
            <Logo className="h-14 w-14"/>
            <div className="text-3xl font-bold text-black">doc</div>
            <div className="text-3xl font-bold text-blue-600">urum</div>
            </div>
        </div>
    )
}