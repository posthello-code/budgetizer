export default function SaveConfirmation(options: any) {
  return (
    <div className="save-page flex flex-1 flex-col justify-center items-center h-screen">
      <div className="m-2">
        Your data will be encrypted, you will need a passphrase. In order to
        reload your data you will need to enter this again.
      </div>
      <div className="save-page-input-box">
        <label>
          ID:
          <input
            className="w-full input-box"
            readOnly={true}
            placeholder={options.searchParams.id}
            defaultValue={options.searchParams.id}
          ></input>
        </label>
      </div>
      <div className="save-page-input-box">
        <label>
          Passphrase
          <input className="w-full input-box"></input>
        </label>
      </div>
    </div>
  );
}
