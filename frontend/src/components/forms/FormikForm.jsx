import { Formik, Form } from "formik";
import FormField from "./FormField";

const FormikForm = ({
	initialValues,
	validationSchema,
	onSubmit,
	submitLabel = "Submit",
}) => {
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={onSubmit}
		>
			{({ errors, touched }) => (
				<Form>
					{Object.keys(initialValues).map((k) => (
						<FormField key={k} name={k} errors={errors} touched={touched} />
					))}
					<button
						// figure out what touched contains
						// disable button when not ready
						disabled={
							Object.keys(errors).length ||
							Object.keys(touched).length === Object.keys(initialValues).length
						}
						type="submit"
					>
						{submitLabel}
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default FormikForm;
