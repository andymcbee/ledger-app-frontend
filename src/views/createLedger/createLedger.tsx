import { Card } from "../../components/card/card";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { styles } from "../../styles";
import { ledgerApi } from "../../api/ledger";
import { UserContext } from "../../app/auth";
import { toast } from "react-toastify";


export function CreateLedger() {

  const { input, button, form } = styles;

  const userData = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ledgerName: ""
    },
  });

  const submitHandler = async (formData) => {
    try {
      const currentOrgId = userData?.user?.user.current_organization;
      console.log(currentOrgId)
      console.log(formData)
      

      const apiPostData = {
        ledger_name: formData.ledgerName
      };

      console.log(apiPostData);

       await ledgerApi.createLedger(
        currentOrgId,
        apiPostData
      );
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <Card title={`Create a New Ledger`}>
        <form
          className={form}
          onSubmit={handleSubmit((data) => submitHandler(data))}
        >
          <div>
            <label htmlFor="ledgerName">Ledger Name</label>
            <input
              className={input}
              id="ledgerName"
              {...register("ledgerName", {
                required: "Ledger name is required",
              })}
            />
            {errors.ledgerName?.message && (
              <small className="block text-red-600">
                {errors.ledgerName.message as string}
              </small>
            )}
          </div>
         
          <button className={button} type="submit">
            Submit
          </button>
        </form>
      </Card>
    </>
  );

}
