import {useState} from "react";

interface Props {
    onCreate: (addresses: string[]) => void;
    hasVault: boolean;
}

const CreateVaultForm = (props: Props) => {
    const { onCreate, hasVault } = props;

    const [account1, setAccount1] = useState('')
    const [account2, setAccount2] = useState('')


  return (
      <div>
          <div>
              <label>Address 1: </label>
              <input
                  type="text"
                  value={account1}
                  onChange={event => {
                      setAccount1(event.target.value);
                  }}
                  placeholder={`fuel123......akjh1`}
              />
          </div>
          <br/>
          <div>
              <label>Address 2: </label>
              <input
                  type="text"
                  value={account2}
                  onChange={event => {
                      setAccount2(event.target.value);
                  }}
                  placeholder={`fuel4Tr......mjhnz`}
              />
          </div>
          <br/>
          <button
              disabled={hasVault}
              onClick={() => {
                  onCreate([account1, account2])
              }}
          >
              Create vault
          </button>
      </div>
  )
}

export {CreateVaultForm};
