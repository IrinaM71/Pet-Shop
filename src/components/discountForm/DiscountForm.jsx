import { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./DiscountForm.module.css";
import { normalizeEmail, sanitizePhone } from "../../shared/validation/utils";
import { http } from "../../shared/http";
import {
  emailRules,
  nameRules,
  phoneRules,
} from "../../shared/validation/rules";
import { Alert, Snackbar } from "@mui/material";

const DiscountForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isSubmittSuccessful },
  } = useForm({ mode: "onChange" });

  const [snack, setSnack] = useState({
    open: false,
    severity: "success",
    message:
      "Thanks! The code of your discount coupon has been siccessfully sent to your e-mail!",
  });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name?.trim(),
      phone: sanitizePhone(data.phone),
      email: normalizeEmail(data.email),
    };

    try {
      await http.post("/sale/send", payload);
      reset();
      setSnack({
        open: true,
        severity: "success",
        message:
          "Thanks! The code of your discount coupon has been siccessfully sent to your e-mail!",
      });
    } catch (error) {
      setSnack({
        open: true,
        severity: "error",
        massage:
          "Something went wrong. Please try again later or check your connection.",
      });
      console.error(error);
    }
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnack((s) => ({ ...s, open: false }));
  };

  const buttonLabel = isSubmitting
    ? "Sending..."
    : isSubmittSuccessful
    ? "Request Submitted"
    : "Get a discount";

  return (
    <>
      <section className={styles.section}>
        <h2 className={styles.title}>5% off on the first order</h2>
        <form
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className={styles.inputs}>
            <div className={styles.field}>
              <input
                className={`${styles.input} ${errors.name ? styles.error : ""}`}
                type="text"
                placeholder="Name"
                aria-invalid={!!errors.name}
                aria-describedby="name-error"
                autoComplete="name"
                {...register("name", nameRules())}
              />
              {errors.name && (
                <span id="name-error" className={styles.helper}>
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className={styles.field}>
              <input
                className={`${styles.input} ${
                  errors.phone ? styles.error : ""
                }`}
                type="tel"
                placeholder="Phone number"
                aria-invalid={!!errors.phone}
                aria-describedby="phone-error"
                inputMode="tel"
                autoComplete="tel"
                {...register("phone", phoneRules())}
                onChange={(e) => {
                  const v = sanitizePhone(e.target.value);
                  setValue("phone", v, { shouldValidate: true });
                }}
              />
              {errors.phone && (
                <span id="phone-error" className={styles.helper}>
                  {errors.phone.massage}
                </span>
              )}
            </div>
            <div className={styles.field}>
              <input
                className={`${styles.input} ${
                  errors.email ? styles.error : ""
                }`}
                type="email"
                placeholder="Email"
                aria-invalid={!!errors.email}
                aria-describedby="email-error"
                inputMode="email"
                autoComplete="email"
                {...register("email", emailRules())}
                onBlur={(e) => {
                  const v = normalizeEmail(e.target.value);
                  setValue("email", v, { shouldValidate: true });
                }}
              />
              {errors.email && (
                <span id="email-error" className={styles.helper}>
                  {errors.email.massage}
                </span>
              )}
            </div>
          </div>

          <button
            className={`${styles.button} ${
              isSubmittSuccessful ? styles.submitted : ""
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {buttonLabel}
          </button>
        </form>
      </section>
      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snack.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default DiscountForm;
