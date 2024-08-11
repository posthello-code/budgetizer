import { useEffect, useState } from "react";
import ClipboardIcon from "@mui/icons-material/ContentCopy";
import { useRouter } from "next/navigation";
import budgetizerApi from "@/app/services/budgetizer-api";
export default function SaveConfirmation(props: any) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<boolean>(false);
  useEffect(() => {});
  return (
    <div className="save-page flex flex-1 flex-col justify-center items-center h-screen">
      {props.tempKey ? (
        <div>
          <div className="m-4">
            You will need the ID to reload or save your data. Please save them
            for future use.
          </div>
          <div
            id="id-box"
            className="save-page-input-box"
            onClick={() => {
              navigator.clipboard.writeText(props.budgetId);
              setCopiedId(true);
            }}
          >
            <label>
              ID: <ClipboardIcon />
              {copiedId && "Copied the id!"}
              <input
                className="w-full input-box"
                readOnly={true}
                placeholder={props.budgetId}
                defaultValue={props.budgetId}
              ></input>
            </label>
          </div>

          <div
            id="passphrase-box"
            className="save-page-input-box"
            onClick={() => {
              navigator.clipboard.writeText(props.tempKey);
              setCopiedKey(true);
            }}
          >
            <label>
              Key: <ClipboardIcon /> {copiedKey && "Copied the key!"}
              <div className="flex flex-row">
                <input
                  readOnly={true}
                  inputMode="text"
                  className="save-page-input-box w-full"
                  type="password"
                  placeholder={props.tempKey}
                  defaultValue={props.tempKey}
                ></input>
              </div>
            </label>
          </div>
          <button
            className="btn-primary"
            onClick={() => {
              localStorage.setItem("tempKey", props.tempKey);
              props.setDisplayConfirmation(false);
              router.push(`/budgets?id=${props.budgetId}`);
            }}
          >
            Ok
          </button>
        </div>
      ) : (
        <div className="save-page flex flex-1 flex-col justify-center items-center h-screen">
          <div className="m-4">
            Please re-enter your key to save changes to the budget
          </div>
          <div id="id-box" className="save-page-input-box">
            <label>
              Key:
              <div className="flex flex-row">
                <input
                  readOnly={false}
                  inputMode="text"
                  className="save-page-input-box w-full"
                  type="password"
                  onChange={(event) => {
                    localStorage.setItem("tempKey", event.target.value);
                  }}
                ></input>
                <button
                  className="btn-primary"
                  onClick={async () => {
                    const key = localStorage.getItem("tempKey") as string;

                    await budgetizerApi.updateBudgetById(
                      props.budgetId,
                      props.budgetData,
                      key
                    );
                    props.setDisplayConfirmation(false);

                    router.push(`/budgets?id=${props.budgetId}`);
                  }}
                >
                  Ok
                </button>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
