import useAuth from "../../../hooks/useAuth";
import CustomLink from "../../UI/CustomLink";

function NavLinks({ flexFlow = "flex-row" }: { flexFlow?: string }) {
	const { user } = useAuth();
	const sideMenuStyling =
		flexFlow === "flex-col" ? "w-full bg-gray-100 p-2 rounded-md" : "";
	return (
		<div className={`flex ${flexFlow} gap-x-4 gap-y-2`}>
			<CustomLink to="/" styles={sideMenuStyling}>
				Home
			</CustomLink>
			<CustomLink to="/catalog" styles={sideMenuStyling}>
				Catalog
			</CustomLink>
			{user && (
				<CustomLink to="/profile" styles={sideMenuStyling}>
					Profile
				</CustomLink>
			)}
			{user && user.isAdmin && (
				<CustomLink to="/admin" styles={sideMenuStyling}>
					Admin
				</CustomLink>
			)}
		</div>
	);
}

export default NavLinks;
