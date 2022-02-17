for file in src/actions/octomedia/*
do
  cat $file
  pd publish "$file"
done
