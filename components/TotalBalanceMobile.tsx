import LogoutButton from "./LogoutButton";

export default function TotalBalanceMobile({ totalBalance }) {
  return (
    <div className="lg:hidden flex flex-col">
      <h6>Your Total Balance</h6>
      <h2 className="text-4xl font-bold">${totalBalance.toLocaleString()}</h2>
      alsdkjfalskjf
      <LogoutButton />
    </div>
  );
}
