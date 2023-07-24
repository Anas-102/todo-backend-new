import * as bcrypt from 'bcrypt';

export async function Hashed(plain: string) {
  const saltval = await bcrypt.genSalt();
  const hash = await bcrypt.hash(plain, saltval);
  return hash;
}
export async function comparePass(plain: string, hashed_pass: string) {
    const auhtentic = await bcrypt.compare(
      plain,
      hashed_pass,
    );
    return auhtentic;
    
}