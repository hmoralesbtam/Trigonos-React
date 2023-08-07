import { Input, TextField, Button, Box } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import InputAdornment from "@mui/material/InputAdornment";
import { CallApi } from "../../store/CallApi";
let banks = [];
let idBank;
export const SimpleForm = ({ cerrar, diccionariop }) => {
  const [render, setRender] = React.useState(false);

  const dataBanks = async () => {
    const bankss = await CallApi(1, 10, 2);
    banks = bankss;
    if (render === false) {
      setRender(true);
    } else {
      setRender(false);
    }
  };
  React.useEffect(() => {
    (async () => {
      dataBanks();
    })();
  }, []);
  const [formState, setFormState] = React.useState({
    id: diccionariop.id,
    name: diccionariop.name,
    rut: diccionariop.rut,
    verificationCode: diccionariop.verification_Code,
    businessName: diccionariop.businessName,
    commercialBusiness: diccionariop.commercial_Business,
    email: diccionariop.dte_Reception_Email,
    bankAccount: diccionariop.bank_Account,
    bank: diccionariop.bank,
    banksName: diccionariop.banksName,
    commercialAddress: diccionariop.commercial_address,
    postalAddress: diccionariop.commercial_address, //REVISAR
    manager: diccionariop.manager,
    payContactFirstName: diccionariop.pay_Contact_First_Name,
    payContactLastName: diccionariop.pay_contact_last_name,
    payContactAddress: diccionariop.pay_contact_address,
    payContactPhones: diccionariop.pay_contact_phones,
    payContactEmail: diccionariop.pay_contact_email,
    billsContactLastName: diccionariop.bills_contact_last_name,
    billsContactFirstName: diccionariop.bills_contact_first_name,
    billsContactAddress: diccionariop.bills_contact_address,
    billsContactPhones: diccionariop.bills_contact_phones,
    billsContactEmail: diccionariop.bills_contact_email,
  });

  const {
    id,
    name,
    rut,
    verificationCode,
    businessName,
    commercialBusiness,
    email,
    bankAccount,
    bank,
    banksName,
    commercialAddress,
    postalAddress,
    manager,
    payContactFirstName,
    payContactLastName,
    payContactAddress,
    payContactPhones,
    payContactEmail,
    billsContactLastName,
    billsContactFirstName,
    billsContactAddress,
    billsContactPhones,
    billsContactEmail,
  } = formState;

  const [update, setUpdate] = React.useState({
    rut1: false,
    businessName1: false,
    email1: false,
    bankAccount1: false,
    banksName1: false,
    commercialAddress1: false,
    manager1: false,
    payContactFirstName1: false,
    payContactPhones1: false,
    payContactEmail1: false,
    billsContactFirstName1: false,
    billsContactPhones1: false,
    billsContactEmail1: false,
  });
  const {
    rut1,
    businessName1,
    email1,
    bankAccount1,
    banksName1,
    commercialAddress1,
    manager1,
    payContactFirstName1,
    payContactPhones1,
    payContactEmail1,
    billsContactFirstName1,
    billsContactPhones1,
    billsContactEmail1,
  } = update;
  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const ApiPatch = () => {
    const apiPatchParticipante =
      ` https://trigonosapi.azurewebsites.net/api/Participantes?` +
      `id=${id}&` +
      `Name=${name}&` +
      `Rut=${rut}&` +
      `Verification_Code=${verificationCode}&` +
      `Business_Name=${businessName}&` +
      `Commercial_Business=${commercialBusiness}&` +
      `Dte_Reception_Email=${email}&` +
      `Bank_Account=${bankAccount}&` +
      `bank=${bank}&` +
      `Commercial_address=${commercialAddress}&` +
      `Postal_address=${postalAddress}&` +
      `Manager=${manager}&` +
      `Pay_Contact_First_Name=${payContactFirstName}&` +
      `Pay_contact_last_name=${payContactLastName}&` +
      `Pay_contact_address=${payContactAddress}&` +
      `Pay_contact_phones=${payContactPhones}&` +
      `Pay_contact_email=${payContactEmail}&` +
      `Bills_contact_first_name=${billsContactFirstName}&` +
      `Bills_contact_last_name=${billsContactLastName}&` +
      `Bills_contact_address=${billsContactAddress}&` +
      `Bills_contact_phones=${billsContactPhones}&` +
      `Bills_contact_email=${billsContactEmail}`;

    const res = axios.patch(apiPatchParticipante);
  };
  const [bankk, setBankk] = React.useState(banksName);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBankk(event.target.value);

    banks.map((d) => {
      if (d.name === event.target.value) {
        idBank = d.id;
      }
    });

    setFormState({
      ...formState,
      bank: idBank,
    });
  };

  return (
    <div>
      <hr />
      <br />
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          id="standard-basic"
          disabled={rut1 ? false : true}
          value={rut1 ? rut : rut.concat("-", verificationCode)}
          name="rut"
          label="Rut"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {rut1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, rut1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          rut: diccionariop.rut,
                          verificationCode: diccionariop.verification_Code,
                        });
                        setUpdate({ ...update, rut1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, rut1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={rut1 ? { width: 150, marginRight: 5 } : { marginRight: 5 }}
        />

        {rut1 && (
          <TextField
            id="standard-basic"
            value={verificationCode}
            name="verificationCode"
            label="Cv"
            variant="standard"
            onChange={onInputChange}
            sx={{ width: 25, marginRight: 9.25 }}
          />
        )}
        <TextField
          disabled={businessName1 ? false : true}
          id="standard-basic"
          value={businessName}
          name="businessName"
          label="Nombre Negocio"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {businessName1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, businessName1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          businessName: diccionariop.businessName,
                        });
                        setUpdate({ ...update, businessName1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, businessName1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={
            businessName1 ? { width: 249, marginRight: 5 } : { marginRight: 5 }
          }
        />
        <TextField
          disabled={email1 ? false : true}
          id="standard-basic"
          value={email}
          name="email"
          label="Correo Electronico"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {email1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, email1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          email: diccionariop.dte_Reception_Email,
                        });
                        setUpdate({ ...update, email1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, email1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={email1 && { width: 249 }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          disabled={bankAccount1 ? false : true}
          id="standard-basic"
          value={bankAccount}
          name="bankAccount"
          label="Cuenta Bancaria"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {bankAccount1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, bankAccount1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          bankAccount: diccionariop.bank_Account,
                        });
                        setUpdate({ ...update, bankAccount1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, bankAccount1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={
            bankAccount1 ? { marginRight: 5, width: 249 } : { marginRight: 5 }
          }
        />
        <TextField
          disabled={banksName1 ? false : true}
          id="standard-select-currency"
          select
          label="Banco"
          value={bankk}
          onChange={handleChange}
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {banksName1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, banksName1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          banksName: diccionariop.banksName,
                          bank: diccionariop.bank,
                        });
                        setBankk(diccionariop.banksName);
                        setUpdate({ ...update, banksName1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, banksName1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={{ marginRight: 5, width: 250 }}
        >
          {banks.map((data) => (
            <MenuItem key={data.id} value={data.name}>
              {data.name}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          disabled={commercialAddress1 ? false : true}
          id="standard-basic"
          value={commercialAddress}
          name="commercialAddress"
          label="Direccion Comercial"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {commercialAddress1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, commercialAddress1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          commercialAddress: diccionariop.commercial_address,
                        });
                        setUpdate({ ...update, commercialAddress1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, commercialAddress1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={commercialAddress1 && { width: 249 }}
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          disabled={manager1 ? false : true}
          id="standard-basic"
          value={manager}
          name="manager"
          label="Manager"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {manager1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, manager1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          manager: diccionariop.manager,
                        });
                        setUpdate({ ...update, manager1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, manager1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={manager1 ? { marginRight: 5, width: 249 } : { marginRight: 5 }}
        />
        <TextField
          disabled={payContactFirstName1 ? false : true}
          id="standard-basic"
          value={
            payContactFirstName1
              ? payContactFirstName
              : payContactFirstName.concat(" ", payContactLastName)
          }
          name="payContactFirstName"
          label="Pagos Contacto Nombre"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {payContactFirstName1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, payContactFirstName1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          payContactFirstName:
                            diccionariop.pay_Contact_First_Name,
                          payContactLastName:
                            diccionariop.pay_contact_last_name,
                        });
                        setUpdate({ ...update, payContactFirstName1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, payContactFirstName1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={
            payContactFirstName1
              ? { marginRight: 5, width: 249 }
              : { marginRight: 5 }
          }
        />
        {payContactFirstName1 && (
          <TextField
            id="standard-basic"
            value={payContactLastName}
            name="payContactLastName"
            label="Pagos Contacto Apellido"
            variant="standard"
            onChange={onInputChange}
            sx={{ width: 249 }}
          />
        )}
        <TextField
          disabled={payContactPhones1 ? false : true}
          id="standard-basic"
          value={payContactPhones}
          name="payContactPhones"
          label="Pagos Contacto Telefono"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {payContactPhones1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, payContactPhones1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          payContactPhones: diccionariop.pay_contact_phones,
                        });
                        setUpdate({ ...update, payContactPhones1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, payContactPhones1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={
            payContactFirstName1
              ? { marginRight: 1, marginTop: 2, width: 249 }
              : { width: 249 }
          }
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          disabled={payContactEmail1 ? false : true}
          id="standard-basic"
          value={payContactEmail}
          name="payContactEmail"
          label="Pagos Contacto Email"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {payContactEmail1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, payContactEmail1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          payContactEmail: diccionariop.pay_contact_email,
                        });
                        setUpdate({ ...update, payContactEmail1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, payContactEmail1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={
            payContactEmail1
              ? { marginRight: 5, width: 249 }
              : { marginRight: 5 }
          }
        />
        <TextField
          disabled={billsContactFirstName1 ? false : true}
          id="standard-basic"
          value={
            billsContactFirstName1
              ? billsContactFirstName
              : billsContactFirstName.concat(" ", billsContactLastName)
          }
          name="billsContactFirstName"
          label="Facturacion Contacto Nombre"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {billsContactFirstName1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, billsContactFirstName1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          billsContactLastName:
                            diccionariop.bills_contact_last_name,
                          billsContactFirstName:
                            diccionariop.bills_contact_first_name,
                        });
                        setUpdate({ ...update, billsContactFirstName1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, billsContactFirstName1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={
            billsContactFirstName1
              ? { marginRight: 5, width: 250 }
              : { marginRight: 5 }
          }
        />
        {billsContactFirstName1 && (
          <TextField
            id="standard-basic"
            value={billsContactLastName}
            name="billsContactLastName"
            label="Facturacion Contacto Apellido"
            variant="standard"
            onChange={onInputChange}
            sx={{ width: 250 }}
          />
        )}
        <TextField
          disabled={billsContactPhones1 ? false : true}
          id="standard-basic"
          value={billsContactPhones}
          name="billsContactPhones"
          label="Facturacion Contacto Telefono"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {billsContactPhones1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, billsContactPhones1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          billsContactPhones: diccionariop.bills_contact_phones,
                        });
                        setUpdate({ ...update, billsContactPhones1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, billsContactPhones1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={
            billsContactFirstName1
              ? { marginRight: 5, marginTop: 2 }
              : { width: 249 }
          }
        />
      </Box>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          disabled={billsContactEmail1 ? false : true}
          id="standard-basic"
          value={billsContactEmail}
          name="billsContactEmail"
          label="Facturacion Contacto Email"
          variant="standard"
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {billsContactEmail1 ? (
                  <>
                    <CheckBoxIcon
                      onClick={() => {
                        setUpdate({ ...update, billsContactEmail1: false });
                      }}
                    />
                    <DisabledByDefaultIcon
                      onClick={() => {
                        setFormState({
                          ...formState,
                          billsContactEmail: diccionariop.bills_contact_email,
                        });
                        setUpdate({ ...update, billsContactEmail1: false });
                      }}
                    />
                  </>
                ) : (
                  <EditIcon
                    onClick={() => {
                      setUpdate({ ...update, billsContactEmail1: true });
                    }}
                  />
                )}
              </InputAdornment>
            ),
          }}
          sx={
            billsContactEmail
              ? { width: 249, marginRight: 5 }
              : { marginRight: 5 }
          }
        />
      </Box>
      <Box mt={1.5}>
        <Button
          sx={{ ml: 32, mr: 3, width: 200 }}
          onClick={ApiPatch}
          variant="contained"
          color="success"
        >
          {" "}
          Modificar
        </Button>

        <Button
          sx={{ width: 200 }}
          onClick={cerrar}
          variant="contained"
          color="error"
        >
          {" "}
          Atras{" "}
        </Button>
      </Box>
    </div>
  );
};
{
}
