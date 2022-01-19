import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
	const messages = useSelector((store) => store.messages);

	return (
		<section>
			{messages.map((m) => (
				<Message
					key={m.id}
					id={m.id}
					text={m.text}
					type={m.type}
					clearSeconds={m.clearSeconds}
				/>
			))}
		</section>
	);
};

export default Messages;
