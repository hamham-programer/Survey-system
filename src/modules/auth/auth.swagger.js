/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Auth module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          SendOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: The mobile number to which the OTP will be sent
 *                      example: "09361234567"
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: The mobile number to verify
 *                      example: "09361234567"
 *                  code:
 *                      type: string
 *                      description: The OTP code received
 *                      example: "852596"
 *          VerifyPhoneNumber:
 *              type: object
 *              required:
 *                  -   receptor
 *                  -   token
 *                  -   template
 *              properties:
 *                  receptor:
 *                      type: string
 *                      description: The mobile number to be verified
 *                      example: "09361234567"
 *                  token:
 *                      type: string
 *                      description: The OTP code received
 *                      example: "852596"
 *                  template:
 *                      type: string
 *                      description: The template used for OTP verification
 *                      example: "myverification"
 */

/**
 * @swagger
 * /auth/send-otp:
 *  post:
 *      summary: Send OTP to a mobile number
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/SendOTP'
 *              application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/SendOTP'
 *      responses:
 *          200:
 *              description: OTP sent successfully
 *          400:
 *              description: Invalid request
 *          500:
 *              description: Server error
 */

/**
 * @swagger
 * /auth/check-otp:
 *  post:
 *      summary: Verify OTP code for a mobile number
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/CheckOTP'
 *              application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/CheckOTP'
 *      responses:
 *          200:
 *              description: OTP verified successfully
 *          400:
 *              description: Invalid OTP or mobile number
 *          500:
 *              description: Server error
 */

/**
 * @swagger
 * /auth/verify-phone:
 *  post:
 *      summary: Verify phone number with OTP
 *      tags:
 *          -   Auth
 *      requestBody:
 *          content:
 *              application/x-www-form-urlencoded:
 *                  schema:
 *                      $ref: '#/components/schemas/VerifyPhoneNumber'
 *              application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/VerifyPhoneNumber'
 *      responses:
 *          200:
 *              description: Phone number verified successfully
 *          400:
 *              description: Invalid request or verification failed
 *          500:
 *              description: Server error
 */

/**
 * @swagger
 * /auth/logout:
 *  get:
 *      summary: Logout user
 *      tags:
 *          -   Auth
 *      responses:
 *          200:
 *              description: User logged out successfully
 *          500:
 *              description: Server error
 */
