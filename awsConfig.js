import AWS from "aws-sdk";

AWS.config.update({
    accessKeyId: "ASIA52SJ4SBDE3K2XZFS",
    secretAccessKey: "Ew+8f2wn0UT/treBCq8MCL4nEkYjyYkaaD54QipM",
    sessionToken: "IQoJb3JpZ2luX2VjENP//////////wEaCXVzLXdlc3QtMiJGMEQCIHOgs0Z+o1o/sY3BCCnpl6JrCx7pPotp5/4MRPg4SexhAiAJxtI+YfTIVC8Gp2ItmhSWsowNn4JlPrPMbt2uZDJ6jiqwAghcEAAaDDk1MDQxNjQ3ODI3OCIMkWndd6y51k2AFmTYKo0C8MSFh1VJt+Q+G64bTmSe64MO98iw44qVgQnhI+kEEz7bkaBAGwNAVi87ZCpOkm1BeGYNFTjZYcay91kgzwUeXQFPdO2wz9+jHmngZU30fuahoYy2vxKgm0hdW/QbWiZDQgAi4pstjKuvdIIZ9L21/m0eif7t8ZRnw7Qxr1XrPhLj6Lev9GEEkB/uRC6nQMf7c8FX1Nfl74MoqDX1JuSVrcRtsllT8j1Lq4lbNAQUW04VrGfw1Fv5F73bwqu3wH+ivyyJb9WEIsLSWlU1LxUA++vsqmybh1GkHktjFJIivvPm3eIdO7cjnxCE768drOuMfNqeqHxj5Iv35hJi2HBfBzVvHto8hYwLQ5VG0zgwt7qDwAY6ngGSDHttwuEp4G0j2MuXzmr6T/qDtIUu/i/nYBhZ23iIcsT0aHe+w3v5mOOvQvwpwk+kcBu9UfMLRRTg/5CugkQuI+9/37cd4Y4nwCNYXYmeM03BEEaRuVFt4JwAw34MYiPQfogq2xPoiv8jyESY+Uj2Bn5/KOWfCNBZ9byee0dMqvNIpJxzzyBVbt132zwtFIxpLfIQR1oj39t+fN1/kQ==",
    region: "us-east-1",
});

const s3 = new AWS.S3();

export default s3;