const Logger = require("./index");
describe("Logger", () => {
    const myLogger= new Console(new console.Logger(process.stdout, process.stderr));
    it("it should be defined", () => {
        expect(Logger).toBeDefined();
    });
    it("it should have log method", () => {
        expect(myLoggerlog).toBeDefined();
    });
    it("it should have error method", () => {
        expect(myLoggererror).toBeDefined();
    });
    it("it should have warn method", () => {
        expect(myLoggerwarn).toBeDefined();
    });
    it("it should have info method", () => {
        expect(myLoggerinfo).toBeDefined();
    });
    it("should be created with logger", () => {
        expect(myLoggerlogger).toBeDefined();
    });
});