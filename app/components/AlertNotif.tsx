import React,{useState} from 'react'


interface IProps {
  showAlert : boolean;
  errorMessage :string;
}
const AlertNotif : React.FC<IProps> =({showAlert, errorMessage})=>{

    return (
        <>
         {showAlert ? (
        <div
          className={
            "text-white px-6 py-4 border-0 rounded relative mb-4 bg-red -500"
          }
          style={{background:"red"}}
        >
          <span className="text-xl inline-block mr-5 align-middle">
            <i className="fas fa-bell" />
          </span>
          <span className="inline-block align-middle mr-8">
             {errorMessage}
          </span>
        </div>
      ) : null}
        </>
    )
}
export default AlertNotif