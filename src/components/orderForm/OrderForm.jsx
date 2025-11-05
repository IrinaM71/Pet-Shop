import { useForm } from "react-hook-form";
import styles from "./OrderForm.module.css";
import { normalizeEmail, sanitizePhone } from "../../shared/validation/utils";
import { Form } from "react-router-dom";
import {
  emailRules,
  nameRules,
  phoneRules,
} from "../../shared/validation/rules";
import { http } from "../../shared/http";

const OrderForm = ({ onSuccess, orderPlaced }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    const payload = {
      name: data.name?.trim(),
      phone: sanitizePhone(data.phone),
      email: normalizeEmail(data.email),
    };

    try {
      await http.post("/order/send", payload);
      reset();
      onSuccess && onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const disabled = isSubmitting || orderPlaced;

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-busy={isSubmitting}
    >
      <input
        type="text"
        placeholder="Name"
        autoComplete="name"
        aria-invalid={!!errors.name}
        aria-describedby="name-error"
        disabled={disabled}
        className={`${styles.input} ${errors.name ? styles.error : ""}`}
        {...register("name", nameRules())}
        onBlur={(event) => {
          const v = event.target.value.trim();
          if (v !== event.target.value) {
            event.target.value = v;
          }
        }}
      />
      {errors.name && (
        <span id="name-error" className={styles.errorMessage}>
          {errors.name.message}
        </span>
      )}

      <input
        type="tel"
        placeholder="Phone number"
        autoComplete="tel"
        inputMode="tel"
        aria-invalid={!!errors.phone}
        aria-describedby="phone-error"
        disabled={disabled}
        className={`${styles.input} ${errors.phone ? styles.error : ""}`}
        {...register(
          "phone",
          phoneRules({
            invalidMsg: "Use digits, spaces, () or + (min length 7)",
          })
        )}
        onChange={(event) => {
          const v = sanitizePhone(event.target.value);
          if (v !== event.target.value) {
            event.target.value = v;
            setValue("phone", v, { shouldValidate: true });
          }
        }}
      />
      {errors.phone && (
        <span id="phone-error" className={styles.errorMessage}>
          {errors.phone.message}
        </span>
      )}

      <input
        type="email"
        placeholder="Email"
        autoComplete="email"
        inputMode="email"
        aria-invalid={!!errors.email}
        aria-describedby="email-error"
        disabled={disabled}
        className={`${styles.input} ${errors.mail ? styles.error : ""}`}
        {...register("email", emailRules())}
        onBlur={(event) => {
          const v = normalizeEmail(event.target.value);
          if (v !== event.target.value) {
            event.target.value = v;
            setValue("email", v, { shouldValidate: true });
          }
        }}
      />
      {errors.email && (
        <span id="email-error" className={styles.errorMessage}>
          {errors.email.message}
        </span>
      )}

      <button
        type="submit"
        disabled={disabled}
        className={`${styles.button} ${orderPlaced ? styles.submitted : ""}`}
      >
        {orderPlaced
          ? "The Order is Placed"
          : isSubmitting
          ? "Sending..."
          : "Order"}
      </button>
    </Form>
  );
};

export default OrderForm;
