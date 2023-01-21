const match = (pathname: string, comparePathname: string, isExact: boolean) => {
  if (isExact) {
    return pathname === comparePathname;
  }

  return pathname.startsWith(comparePathname);
};

const routingHelpers = {
  match,
};

export {
  routingHelpers,
};
