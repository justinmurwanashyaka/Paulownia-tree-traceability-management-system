
import StatusList from "../Components/statuslist"

export default function StatusListInformation({userRole}) {
  return (
    <div className="container">
        <div className="table-container" >
            <StatusList userRole={userRole}/>
        </div>
    </div>
);
}