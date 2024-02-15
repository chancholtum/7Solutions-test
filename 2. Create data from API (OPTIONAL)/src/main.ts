interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: {
    color: string;
    type: string;
  };
  domain: string;
  ip: string;
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  macAddress: string;
  university: string;
  bank: {
    cardExpire: string;
    cardNumber: string;
    cardType: string;
    currency: string;
    iban: string;
  };
  company: {
    address: {
      address: string;
      city: string;
      coordinates: {
        lat: number;
        lng: number;
      };
      postalCode: string;
      state: string;
    };
    department: string;
    name: string;
    title: string;
  };
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: {
    coin: string;
    wallet: string;
    network: string;
  };
}

async function fetchUsers(): Promise<User[]> {
  const response = await fetch("https://dummyjson.com/users");
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const users = (await response.json()).users as User[];
  return users;
}

(async () => {
  try {
    const users = await fetchUsers();
    // console.log(users);

    // group department
    const departments: string[] = [
      ...new Set(users.map((user) => user.company.department)),
    ];

    // staff each department
    const matchDeparment = (department: string) => {
      const staff = users.filter(
        (user) => user.company.department === department
      );

      return staff;
    };

    // sumfunction
    const handleCountSum = (department: string, item: string) => {
      const amount = users.filter(
        (user) => user.company.department === department && user.gender === item
      ).length;

      return amount;
    };

    // agerange
    const handleAgeRange = (department: string) => {
      const staffs = matchDeparment(department);

      const maxAge = Math.max(...staffs.map((staff) => staff.age));
      const minAge = Math.min(...staffs.map((staff) => staff.age));
      const ageRange = minAge === maxAge ? `${minAge}` : `${minAge}-${maxAge}`;

      return ageRange;
    };

    // separate hair
    const handleHair = (department: string) => {
      const staffs = matchDeparment(department);
      const hairsSame = staffs.map((staff) => staff.hair.color);
      const hairsNotSame = [
        ...new Set(staffs.map((staff) => staff.hair.color)),
      ];

      const formattedHair = Object.assign(
        {},
        ...hairsNotSame.map((hairNotSame) => ({
          [hairNotSame]: hairsSame.filter(
            (hairSame) => hairSame === hairNotSame
          ).length,
        }))
      );

      return formattedHair;
    };

    // addressUser
    const handleAddressUser = (department: string) => {
      const staffs = matchDeparment(department);

      const formattedAddressUser = Object.assign(
        {},
        ...staffs.map((staff) => ({
          [`${staff.firstName}${staff.lastName}`]: staff.address.postalCode,
        }))
      );

      return formattedAddressUser;
    };

    // formatted
    const formattedData = departments.map((department) => ({
      [department]: {
        male: handleCountSum(department, "male"),
        female: handleCountSum(department, "female"),
        ageRange: handleAgeRange(department),
        hair: handleHair(department),
        addressUser: handleAddressUser(department),
      },
    }));

    const jsonData = JSON.stringify(formattedData);

    console.log(jsonData);
  } catch (err) {
    console.log(err);
  }
})();
