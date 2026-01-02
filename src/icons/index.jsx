export const Search = () => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export const ArrowRight = ({ color, className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.39862 4.32752C9.69152 4.03463 10.1664 4.03463 10.4593 4.32752L16.8232 10.6915C17.5067 11.3749 17.5067 12.4829 16.8232 13.1664L10.4593 19.5303C10.1664 19.8232 9.69152 19.8232 9.39863 19.5303C9.10573 19.2374 9.10573 18.7625 9.39863 18.4697L15.7626 12.1057C15.8602 12.0081 15.8602 11.8498 15.7626 11.7521L9.39863 5.38818C9.10573 5.09529 9.10573 4.62041 9.39862 4.32752Z"
          fill={color}
        />
      </svg>
    </>
  );
};

export const ArrowLeft = ({ color, className }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.6014 4.46967C14.8943 4.76256 14.8943 5.23744 14.6014 5.53033L8.23741 11.8943C8.13978 11.9919 8.13978 12.1502 8.23741 12.2478L14.6014 18.6118C14.8943 18.9047 14.8943 19.3796 14.6014 19.6725C14.3085 19.9654 13.8336 19.9654 13.5407 19.6725L7.17675 13.3085C6.49333 12.6251 6.49333 11.517 7.17675 10.8336L13.5407 4.46967C13.8336 4.17678 14.3085 4.17678 14.6014 4.46967Z"
          fill={color}
        />
      </svg>
    </>
  );
};

// export const icon = () => {
//   return <></>;
// };
