import { async } from "@firebase/util";

jest.mock("./AdData");


module.exports = async () => {
    process.env.TZ = 'CET';
}

describe("Correct rented status", () => {
    it("Should return true when rented", async () => {
        const loanStartDate = new Date("2023-03-07");
        const nowDate = new Date("2023-03-08");
        const loanEndDate = new Date;

        const spy = jest
            .spyOn(Date, "now")
            .mockImplementation(() => nowDate.getTime());
            
        const { getRentedStatus } = require('./AdData');
        const rentedStatus = await getRentedStatus();
        spy.mockRestore();
        expect(rentedStatus).toEqual(true);
    })
})

