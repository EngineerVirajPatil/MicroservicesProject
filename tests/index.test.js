const axiosInstance = require("../lib/axios.js");
const getFlightsByDetails = require("../index.js");

jest.mock("../lib/axios.js", () => ({
    get: jest.fn(),
}));

describe("index.js test cases", () => {
  test("getFlightsByDetails by origin and destination test case", async () => {
    const mockResponse = {
      data: {
        flights: [
          {
            id: 15,
            origin: "varanasi",
            destination: "tirupati",
            flight_number: "5383",
            departure_time: "5/9/2025, 4:33:52 PM",
            arrival_time: "5/9/2025, 6:33:52 PM",
            price: 932.56,
          },
        ],
      },
    };

  
    axiosInstance.get.mockResolvedValue(mockResponse);

    const req = { query: { origin: "varanasi", destination: "tirupati" } };
    const res = {
      json: jest.fn(),
      status: jest.fn(() => res),
    };


    await getFlightsByDetails(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/flights/search?origin=varanasi&destination=tirupati"
    );
    expect(res.json).toHaveBeenCalledWith(mockResponse.data);
  });
});
