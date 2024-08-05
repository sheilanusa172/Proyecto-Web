import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'disenowebgrupo1@gmail.com',
        pass: 'nnjx nfje euim kjci',
    },
});

export const sendVerificationEmail = (email, token) => {
    const mailOptions = {
        from: 'disenowebgrupo1@gmail.com',
        to: email,
        subject: 'Account Verification',
        text: `Please verify your account by clicking the link: http://localhost:4000/api/verify/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};
