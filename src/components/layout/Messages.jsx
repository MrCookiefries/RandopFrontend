import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import Message from "./Message";

const Messages = () => {
	const messages = useSelector((store) => store.messages);

	return (
		<Box sx={{ position: "fixed", width: "100%", zIndex: 10000, bottom: 0 }}>
			{messages.map((m) => (
				<Box key={m.id}>
					<Message
						id={m.id}
						text={m.text}
						type={m.type}
						clearSeconds={m.clearSeconds}
					/>
				</Box>
			))}
		</Box>
	);
};

export default Messages;
