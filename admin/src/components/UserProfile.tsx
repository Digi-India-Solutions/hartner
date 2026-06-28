import { User } from "../types";

type Props = {
  data: User;
};

function UserProfile(props: Props) {
  const { name, email, role, image } = props.data;
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-navy-100 p-8 mt-10">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-brand-500 shadow-lg flex-shrink-0 flex items-center justify-center bg-navy-50">
          {image ? (
            <img src={image} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-brand-700 text-3xl font-extrabold uppercase">
              {name ? name[0] : "U"}
            </span>
          )}
        </div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-navy-900 tracking-tight flex flex-wrap justify-center sm:justify-start items-center gap-2">
            <span>{name}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-navy-100 text-navy-600 uppercase">
              {role}
            </span>
          </h2>
          <p className="text-navy-500 mt-1 font-medium">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
