import { Button } from "antd";
import { GoogleIcon } from "assets/icons/GoogleIcon";
import React from "react";

export const SocialLogin = React.memo(({ onLogin }: { onLogin: (provider: string) => void }) => (
    <div className="social-login">
        {/* <Button
            icon={<FacebookIcon />}
            onClick={() => onLogin('facebook')}
        /> */}
        <Button
            icon={<GoogleIcon />}
            onClick={() => onLogin('google')}
        />
        {/* <Button
            icon={<ZaloIcon />}
            onClick={() => onLogin('zalo')}
        /> */}
    </div>
));