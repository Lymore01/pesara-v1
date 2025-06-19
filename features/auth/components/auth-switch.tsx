import Link from "next/link";

type AuthSwitchProps = {
  type: "sign-in" | "sign-up";
};

export function AuthSwitch({ type }: AuthSwitchProps) {
  return (
    <div className="w-full text-sm text-muted-foreground text-center space-y-1">
      {type === "sign-in" ? (
        <>
          <p>
            Don’t have an account?{" "}
            <Link href="/sign-up" className="hover:underline text-foreground hover:opacity-80">
              Sign up
            </Link>
          </p>
          <p>
            Or{" "}
            <Link href="/" className="hover:underline text-foreground hover:opacity-80">
              Learn More
            </Link>
          </p>
        </>
      ) : (
        <>
          <p>
            By signing up, you agree with <br />
            <Link href="/terms" className="hover:underline text-foreground hover:opacity-80">
              Terms of Service
            </Link>
          </p>
          <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="hover:underline text-foreground hover:opacity-80">
              Sign in
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
