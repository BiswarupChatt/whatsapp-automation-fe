import React, { useEffect, useState } from "react";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

export default function ConnectionManager() {
    const [connected, setConnected] = useState(false);
    const [user, setUser] = useState(null);
    const [qrText, setQrText] = useState(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000");

        ws.onmessage = (msg) => {
            const { event, data } = JSON.parse(msg.data);

            if (event === "qr") {
                setQrText(data.qr);
                setConnected(false);
                setUser(null);
            } else if (event === "connected") {
                setConnected(true);
                setQrText(null);
                setUser(data.user);
            } else if (event === "disconnected") {
                setConnected(false);
                setUser(null);
            } else if (event === "status") {
                // 👇 Handle initial state sync
                setConnected(data.connected);
                if (data.user) setUser(data.user);
                if (!data.connected && data.qr) setQrText(data.qr);
            }
        };


        return () => ws.close();
    }, []);

    return (
        <Box
            sx={{
                mt: 4,
                p: 3,
                textAlign: "center",
                bgcolor: "white",
                borderRadius: 2,
                boxShadow: 3,
                maxWidth: 400,
                mx: "auto",
            }}
        >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
                WhatsApp Connection
            </Typography>

            {connected ? (
                <>
                    <Typography color="green" variant="body1">
                        ✅ Connected to WhatsApp
                    </Typography>
                    {user && (
                        <Typography sx={{ mt: 1 }} color="text.secondary">
                            Logged in as: <strong>{user.name}</strong> ({user.number})
                        </Typography>
                    )}
                </>
            ) : (
                <Typography color="error" variant="body1">
                    ❌ Not Connected
                </Typography>
            )}

            {!connected && qrText && (
                <Box mt={2}>
                    <Typography variant="body2">Scan this QR with WhatsApp:</Typography>
                    <QRCodeSVG value={qrText} size={250} includeMargin={true} />
                </Box>
            )}

            {!connected && !qrText && (
                <Box mt={2}>
                    <CircularProgress />
                    <Typography variant="body2" mt={1}>
                        Waiting for QR code...
                    </Typography>
                </Box>
            )}
        </Box>
    );
}
